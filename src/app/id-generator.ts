var GlobalId = 0
export class Id {
  id: number
  constructor() {
    GlobalId ++
    this.id = GlobalId
  }
}