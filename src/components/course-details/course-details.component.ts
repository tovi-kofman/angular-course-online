import { Component, Input } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course.model';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons/lessons.service';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatButtonModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {

  @Input() courseId: number = 0;
  course: Course | undefined;
  lessons: Lesson[] = [];

  constructor(private courseService: CoursesService, private lessonServises: LessonsService, private router: Router) { }

  ngOnInit(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
        console.log('succeesd');
      },
      error: (error) => {
        console.error('Error loading course details', error);
        alert('Error loading course details');
      }
    })
    this.getLessons();
  }


  getLessons() {
    this.lessonServises.getLessons(this.courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
      },
      error: (error) => {
        console.error('Error loading lessons', error);
        alert('Error loading lessons');
      }
    });
  }

  deleteLesson(lessonId: number) {
    this.lessonServises.deleteLesson(lessonId, this.courseId).subscribe({
      next: (res) => {
        console.log(res.message);
        this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
      },
      error: (err) => console.error(err)
    });
  }

  updateLesson(lessonId: number) {
    this.router.navigate([`/courses/${this.courseId}/lessons/${lessonId}/update`]);
  }

  addLesson() {
    this.router.navigate([`/courses/${this.courseId}/lessons/add`]);
  }
}
