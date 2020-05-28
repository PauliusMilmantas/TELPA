import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TopicAPIService } from "../api/topic-api.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Topic, Employee } from "../api/api-entities";
import { SessionAPIService } from "../api/session-api.service";
import { EmployeeAPIService } from "../api/employee-api.service";
import { switchMap, catchError, flatMap, map, tap } from "rxjs/operators";
import { of, Observable, forkJoin } from "rxjs";

declare var Treant: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-employee-tree",
  templateUrl: "./employee-tree.component.html",
  styleUrls: ["./employee-tree.component.css"],
})
export class EmployeeTreeComponent implements OnInit {
  chartConfig: any = {
    chart: {
      container: "#tree-id",
      scrollbar: "fancy",
      rootOrientation: "NORTH",
      nodeAlign: "TOP",
      levelSeparation: 100,
      siblingSeparation: 50,
      subTreeSeparation: 100,
      // node: { collapsable: true },
      connectors: { type: "bCurve" },
      // animateOnInit: true,
      animation: {
        nodeAnimation: "easeOutElastic",
        connectorsAnimation: "elastic",
      },
    },
    nodeStructure: {},
  };

  constructor(
    private sessionAPI: SessionAPIService,
    private employeeAPI: EmployeeAPIService
  ) {}

  ngOnInit() {
    this.sessionAPI
      .me()
      .pipe(
        flatMap((e: Employee) => {
          return this.getWithSubordinates(e);
        })
      )
      .subscribe(
        (e: Employee) => {
          this.chartConfig.nodeStructure = this.getNodeStructure(e);
          this.chartConfig.nodeStructure.collapsed = false;
          (() => Treant(this.chartConfig))();
        },
        (err: HttpErrorResponse) => {}
      );
  }

  getNodeStructure(leader: Employee) {
    let structure = {
      innerHTML: `<div style="white-space: nowrap;"><h3>${leader.name}</h3><h4>${leader.email}</h4></div>`,
      collapsed: true,
      collapsable: true,
      children: [],
    };
    for (const e of leader.subordinates) {
      structure.children.push(this.getNodeStructure(e));
    }
    if (structure.children.length === 0) {
      structure.collapsable = false;
      structure.collapsed = false;
    }
    return structure;
  }

  getWithSubordinates(leader: Employee): Observable<Employee> {
    return this.employeeAPI.getSubordinates(leader.id).pipe(
      flatMap((subordinates) =>
        forkJoin([
          of(leader),
          ...subordinates.map((e) => this.getWithSubordinates(e)),
        ])
      ),
      tap(([leader, ...subordinates]) => (leader.subordinates = subordinates)),
      map(([leader]) => leader)
    );
  }
}
