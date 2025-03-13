import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-lesson',
  standalone: true,
  imports: [
    ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatIconModule,
  ],
  templateUrl: './add-lesson.component.html',
  styleUrl: './add-lesson.component.css'
})

export class AddLessonComponent implements OnInit {

  addLessonForm!: FormGroup;
  courseId!: number;
  constructor(private fb: FormBuilder, private lessonSevices: LessonsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.addLessonForm = this.fb.group({
      title: ['', [Validators.required]],
      contant: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.activatedRoute.params.subscribe(params => {
      this.courseId = +params['id'];
    });
  }

  onSubmit() {
    if (this.addLessonForm.valid) {
      console.log(this.courseId);
      console.log(this.addLessonForm.get('title')?.value);
      console.log(this.addLessonForm.get('contant')?.value);

      this.lessonSevices.addLesson(
        this.addLessonForm.get('title')?.value,
        this.addLessonForm.get('contant')?.value,
        this.courseId
      ).subscribe({
        next: (response) => {
          alert('Lesson added successfully');
          this.router.navigate([`/courses`]);
        },
        error: (error) => {
          console.error('Error adding lesson', error);
          alert('Error adding lesson');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}
