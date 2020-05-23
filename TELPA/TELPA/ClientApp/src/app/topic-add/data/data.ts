export class TopicData {
  constructor(
    public id: number,
    public parentId: number,
    public name: string,
    public description: string,
    public links: string[]
  ) { }
}
