import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {BabyService} from '../../../services/baby.service';
import {Baby} from '../../../models/baby.model';
import {timer} from 'rxjs';

@Component({
  selector: 'app-baby-list',
  templateUrl: './baby-list.component.html',
  styleUrls: ['./baby-list.component.css']
})
export class BabyListComponent implements OnInit {
  isAdmin = false;
  babyList: Array<Baby>;
  error = false;

  constructor(private authenticationService: AuthenticationService, private babyService: BabyService) {
    this.isAdmin = this.authenticationService.decryptedUser.role === 'ADMIN';
  }

  ngOnInit(): void {
    this.getBabyList();
  }

  delete(_id: string) {
    this.babyService.delete(_id).subscribe(() => {
      this.getBabyList();
    });
  }

  private getBabyList() {
    this.babyService.findAll().subscribe(response => {
      this.babyList = response.result;
    });
  }
}
