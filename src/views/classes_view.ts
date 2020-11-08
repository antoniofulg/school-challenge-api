import Class from '../models/Class'

export default {
  render(classEntity: Class) {
    return {
      id: classEntity.id,
      name: classEntity.name,
      students: classEntity.students,
    }
  },
  renderMany(classes: Class[]) {
    return classes.map((classEntity) => this.render(classEntity))
  },
}
