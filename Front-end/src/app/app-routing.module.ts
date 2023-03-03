import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BriefcaseComponent } from './components/briefcase/briefcase.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MembershipComponent } from './components/membership/membership.component';
import { NewsComponent } from './components/news/news.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'briefcase', component: BriefcaseComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'news', component: NewsComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'membership', component: MembershipComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
