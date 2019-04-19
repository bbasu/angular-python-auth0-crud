import * as Auth0 from 'auth0-web';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Exam} from './exam.model';
import {ExamsApiService} from './exams-api.service';


@Component({
  selector: 'exams',
  templateUrl: './exams.component.html',
  styleUrls: ['exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {
    examsListSubs: Subscription;
    examsList: Exam[];
    authenticated = false;
  
    constructor(private examsApi: ExamsApiService) { }  
  
    signIn = Auth0.signIn;
    signOut = Auth0.signOut;
    getProfile = Auth0.getProfile;  
  
    ngOnInit() {
      this.examsListSubs = this.examsApi
        .getExams()
        .subscribe(res => {
            this.examsList = res;
            console.log(this.examsList);
          },
          console.error
        );
      const self = this;
      Auth0.subscribe(authenticated => {
          self.authenticated = authenticated;
      });
    } 
  
    ngOnDestroy() {
      this.examsListSubs.unsubscribe();
    }

    delete(examId: number) {
        this.examsApi
            .deleteExam(examId)
            .subscribe(() => {
            this.examsListSubs = this.examsApi
                .getExams()
                .subscribe(res => {
                    this.examsList = res;
                },
                console.error
                )
            }, console.error);
    }

    isAdmin() {
        if (!Auth0.isAuthenticated()) return false;
        const roles = Auth0.getProfile()['https://online-exams.com/roles'];
        console.log(roles);
        return roles && roles.includes('admin');
    }
  }