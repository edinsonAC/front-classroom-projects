import { Component } from '@angular/core';
import { ListMyProjects } from '../../interfaces/my_projects.interface';
import { PersonService } from '../../service/person.service';
import { BaseComponent } from '../../../../shared/base/base.component';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/auth/service/login.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent extends BaseComponent {

  projects!: ListMyProjects[]
  loading: boolean = true

  items!: MenuItem[];
  home!: MenuItem;
  role!:string

  email!:string

  constructor(
    private personService: PersonService,
    private authService: LoginService
  ) {
    super()
    this.email = localStorage.getItem("email")!
    this.uploadMyProjects()
    this.role = localStorage.getItem("role")!
  }

  ngOnInit(): void {
    this.items = [
      { label: "Proyectos", disabled: true },
      { label: 'Mis Proyectos', disabled: true }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  uploadMyProjects() {
    this.personService.viewMyProjects(this.email).subscribe({
      next: value => {
        this.projects = value.data.projects
        console.log(value.data.projects)
        this.loading = false
      },
      error: e => {
        this.loading = false
      }
    })
  }

  approveProject(id: string){
    this.personService.changeState(id , "approve").subscribe({
      next: value => {
        this.alertSuccess(value.data)
        this.loading = false
      },
      error: e => {
        this.loading = false
      }
    })
  }


  disapproveProject(){
    this.alertSuccess("Disapproved project")
  }

}
