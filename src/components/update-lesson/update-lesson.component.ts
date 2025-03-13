import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-lesson',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './update-lesson.component.html',
  styleUrl: './update-lesson.component.css'
})
export class UpdateLessonComponent implements OnInit {
  updateLessonForm!: FormGroup;
  courseId!: number;
  lessonId!: number;
  
  constructor(private fb: FormBuilder, private lessonService: LessonsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateLessonForm = this.fb.group({
      title: ['', [Validators.required]],
      contant: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
    });
  }

  onSubmit() {
    if (this.updateLessonForm.valid) {
      this.lessonService.updateLesson(
        +this.courseId,
        +this.lessonId,
        this.updateLessonForm.get('title')?.value,
        this.updateLessonForm.get('contant')?.value,
      ).subscribe({
        next: (response) => {
          this.router.navigate(['/courses', this.courseId]);
          alert('Lesson updated successfully');
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error updating lesson', error);
          alert('Error updating lesson');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
