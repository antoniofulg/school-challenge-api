import Student from '../models/Student'

export default {
  render(student: Student, simplified: Boolean = false) {
    if (!simplified) {
      return {
        id: student.id,
        ra: student.ra,
        name: student.name,
        degree: student.degree,
        class: student.class,
      }
    } else {
      return {
        id: student.id,
        ra: student.ra,
        name: student.name,
        classId: student.classId,
        degreeId: student.degreeId,
      }
    }
  },
  renderMany(students: Student[]) {
    return students.map((student) => this.render(student))
  },
}
