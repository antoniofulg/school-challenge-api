import Teacher from '../models/Teacher'

export default {
  render(teacher: Teacher) {
    return {
      id: teacher.id,
      name: teacher.name,
    }
  },
  renderMany(teachers: Teacher[]) {
    return teachers.map((teacher) => this.render(teacher))
  },
}
