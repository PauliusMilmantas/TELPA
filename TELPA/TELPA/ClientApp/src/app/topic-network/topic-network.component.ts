import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import * as d3 from "d3";
import { TopicAPIService } from "../api/topic-api.service";
import { SessionAPIService } from "../api/session-api.service";
import { EmployeeAPIService } from "../api/employee-api.service";
import { Employee, Topic } from "../api/api-entities";
import { Observable, forkJoin, of } from "rxjs";
import { flatMap, tap, map, switchMap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
// import { swatches } from "@d3/color-legend";

@Component({
  selector: "app-topic-network",
  templateUrl: "./topic-network.component.html",
  styleUrls: ["./topic-network.component.css"],
})
export class TopicNetworkComponent implements AfterViewInit {
  @ViewChild("viewElement", {
    static: true,
  })
  viewElement: ElementRef;

  constructor(
    private topicAPI: TopicAPIService,
    private sessionAPI: SessionAPIService,
    private employeeAPI: EmployeeAPIService
  ) {}

  ngAfterViewInit() {
    let types = ["learned", "recommended", "subtopic"];
    let color = (type: string) => {
      let lut = {
        learned: "#00bc8c",
        recommended: "#3498db",
        subtopic: "#444",
      };
      return lut[type];
    };
    this.sessionAPI
      .me()
      .pipe(
        flatMap((e: Employee) => {
          return this.getWithSubordinatesAndTopics(e);
        })
      )
      .subscribe(
        (leader: Employee) => {
          this.topicAPI.getAll().subscribe(
            (topics: Topic[]) => {
              let data = this.getDataStructure(leader);
              for (const t of topics) {
                data.nodes.push({
                  id: `topic-${t.id}`,
                  text: t.name,
                });
                if (t.parentTopicId) {
                  data.links.push({
                    source: `topic-${t.parentTopicId}`,
                    target: `topic-${t.id}`,
                    type: "subtopic",
                  });
                }
              }
              let width = (<HTMLElement>this.viewElement.nativeElement)
                .offsetWidth;
              let height = (<HTMLElement>this.viewElement.nativeElement)
                .offsetHeight;
              let zoom = 0.75;
              width = width * zoom;
              height = height * zoom;
              this.chart(width, height, types, data, color);
            },
            (err: HttpErrorResponse) => {}
          );
        },
        (err: HttpErrorResponse) => {}
      );
  }

  getDataStructure(leader: Employee, data = { nodes: [], links: [] }) {
    data.nodes.push({
      id: `employee-${leader.id}`,
      text: leader.name,
    });
    for (const t of leader.learnedTopics) {
      data.links.push({
        source: `employee-${leader.id}`,
        target: `topic-${t.topicId}`,
        type: "learned",
      });
    }
    for (const t of leader.recommendedTopics) {
      data.links.push({
        source: `topic-${t.topicId}`,
        target: `employee-${leader.id}`,
        type: "recommended",
      });
    }
    if (leader.subordinates.length !== 0) {
      for (const e of leader.subordinates) {
        data = this.getDataStructure(e, data);
      }
    }
    return data;
  }

  getWithSubordinatesAndTopics(leader: Employee): Observable<Employee> {
    return this.employeeAPI.getLearnedTopics(leader.id).pipe(
      flatMap((learnedTopics) => {
        leader.learnedTopics = learnedTopics;
        return of(leader);
      }),
      switchMap((leader) =>
        this.employeeAPI.getRecommendedTopics(leader.id).pipe(
          flatMap((recommendedTopics) => {
            leader.recommendedTopics = recommendedTopics;
            return of(leader);
          })
        )
      ),
      switchMap((leader) =>
        this.employeeAPI.getSubordinates(leader.id).pipe(
          flatMap((subordinates) =>
            forkJoin([
              of(leader),
              ...subordinates.map((e) => this.getWithSubordinatesAndTopics(e)),
            ])
          ),
          tap(
            ([leader, ...subordinates]) => (leader.subordinates = subordinates)
          ),
          map(([leader]) => leader)
        )
      )
    );
  }

  chart = (
    width: number,
    height: number,
    types: string[],
    data: any,
    color: (type: string) => string
  ) => {
    const links = data.links.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d["id"])
      )
      .force("charge", d3.forceManyBody().strength(-600))
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select("svg")
      .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`);

    svg
      .append("defs")
      .selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", (d) => color(d["type"]))
      .attr("marker-end", (d) => `url(#arrow-${d["type"]})`);

    const node = svg
      .append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(this.drag(simulation));

    node
      .append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr("r", 5);

    node
      .append("text")
      .attr("font-size", "15px")
      .attr("x", 10)
      .attr("y", "1em")
      .text((d) => d["text"])
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    simulation.on("tick", () => {
      link.attr("d", (d) =>
        d["type"].charAt(0) !== "s" ? this.linkArc(d) : this.linkStraight(d)
      );
      node.attr("transform", (d) => `translate(${d["x"]},${d["y"]})`);
    });

    // invalidation.then(() => simulation.stop());

    return svg.node();
  };

  drag = (simulation) => {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  linkArc(d) {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
    `;
  }

  linkStraight(d) {
    return `
      M ${d.source.x} ${d.source.y} ${d.target.x} ${d.target.y}
    `;
  }
}
