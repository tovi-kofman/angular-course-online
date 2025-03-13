import { Routes } from '@angular/router';
import { CoursesComponent } from '../components/courses/courses.component';
import { UpdateCourseComponent } from '../components/update-course/update-course.component';
import { AddLessonComponent } from '../components/add-lesson/add-lesson.component';
import { UpdateLessonComponent } from '../components/update-lesson/update-lesson.component';
import { AddCourseComponent } from '../components/add-course/add-course.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterationComponent } from '../components/registeration/registeration.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'registeration', component:RegisterationComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'courses/add', component: AddCourseComponent},
    {path: 'courses/:id/update', component: UpdateCourseComponent},
    {path: 'courses/:id/lessons/add', component: AddLessonComponent},
    {path: 'courses/:courseId/lessons/:lessonId/update', component: UpdateLessonComponent},

];