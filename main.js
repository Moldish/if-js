import studentsData from "./data.js";
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName () {
    return `${this.firstName} ${this.lastName}`
  }
}
let user = new User("Ivan", "Ivanov");

console.log(user)

class Student extends User {
  constructor(admissionYear, courseName, firstName, lastName) {
    super(firstName, lastName);
    this.admissionYear = admissionYear;
    this.courseName = courseName
  }

  get course() {
    let currentYear = 2023
    return currentYear - this.admissionYear
  }
}

let student = new Student(2019, "Java", "Ivan", "Ivanoff")
console.log(student)

class Students {
  constructor(array) {
    this.array = array.reduce((array, student) => {
      array.push(
          new Student(
              student.admissionYear,
              student.courseName,
              student.firstName,
              student.lastName,
          ),
      );
      return array;
    }, []);
  }

  getInfo() {
    return this.array
        .sort((a, b) => (a.course - b.course))
        .map((student) => `${student.fullName} - ${student.courseName}, ${student.course} курс`)
  }
}

let students = new Students(studentsData)
console.log(students.getInfo());