import Student from '../models/Student'

export default {
  render(student: Student) {
    return {
      id: student.id,
      ra: student.ra,
      name: student.name,
      degree: student.degree,
      class: student.class,
    }
  },
  renderMany(students: Student[]) {
    return students.map((student) => this.render(student))
  },
}
