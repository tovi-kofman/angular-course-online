import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses/courses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {

  addCourseForm!: FormGroup;
  courses: Course[] = [];
  constructor(private fb: FormBuilder, private courseService: CoursesService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.addCourseForm.valid) {
      const userId = this.authService.getUserId();
      this.courseService.addCourse(
        this.addCourseForm.get('title')?.value,
        this.addCourseForm.get('description')?.value,
        userId
      ).subscribe({
        next: (response) => {
          alert('Course added successfully');          
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          alert('Error adding course');
          console.error('Error adding course', error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate([`/courses`]);
  }
}
