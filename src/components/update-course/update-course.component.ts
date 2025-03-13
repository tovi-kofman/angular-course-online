import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit {

  updateCourseForm!: FormGroup;
  courseId!: number;
  constructor(private fb: FormBuilder, private courseService: CoursesService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
    }),

    this.updateCourseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.updateCourseForm.valid) {
      const userId = this.authService.getUserId();
      this.courseService.updateCourse(
        this.courseId,
        this.updateCourseForm.get('title')?.value,
        this.updateCourseForm.get('description')?.value,
        userId
      ).subscribe({
        next: (response) => {
          alert('Course updated successfully');
          this.router.navigate([`/courses`]);
        },
        error: (error) => {
          console.error('Error updating course', error);
          alert('Error updating course');
        }
      });
    }
  }

  cancel() {
    this.router.navigate([`/courses`]);
  }
}
