import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { AuthService } from '../../services/auth/auth.service';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CourseDetailsComponent,
    MatDialogModule,
    AddCourseComponent,
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  courseDetailesId: number = 0;

  constructor(private courseService: CoursesService, private authService: AuthService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error loading courses', error);
        alert('Error loading courses');
      }
    });
  }


  enroll(courseId: number) {
    const userId = this.authService.getUserId();
    this.courseService.enrollInCourse(courseId, userId).subscribe(
      response => {
        console.log('Enrolled in course successfully');
        alert('Enrolled in course successfully');
      });
  }

  leave(courseId: number) {
    const userId = this.authService.getUserId();
    this.courseService.leaveCourse(courseId, userId).subscribe(
      response => {
        console.log('Left course successfully');
        alert('Left course successfully');
      });
  }

  courseDetails(courseId: number) {
    this.courseDetailesId = courseId;
  }

  addCourse() {
    this.router.navigate(['/courses/add']);
  }

  updateCourse(courseId: number) {
    this.router.navigate([`/courses/${courseId}/update`]);
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(
      response => {
        this.courses = this.courses.filter(course => course.id !== courseId);
        console.log('Course deleted successfully');

      });
  }

}
