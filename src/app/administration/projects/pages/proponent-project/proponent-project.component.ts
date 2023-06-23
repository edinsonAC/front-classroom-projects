import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';;
import { ProjectService } from '../../service/project.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-proponent-project',
  templateUrl: './proponent-project.component.html',
  styleUrls: ['./proponent-project.component.css']
})
export class ProponentProjectComponent extends BaseComponent {

  items!: MenuItem[];
  home!: MenuItem;

  title: string = ""
  loading: boolean = true
  formProject!: FormGroup

  group_id!: string
  subject_name!:string

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router:Router,
    private projectService: ProjectService,
  ) {
    super()
    this.group_id = this.aRoute.snapshot.paramMap.get("id")!
    this.subject_name = this.aRoute.snapshot.paramMap.get("subject")!
    this.loadForm()
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Materias', disabled:true },
      { label: 'Mis Materias', routerLink:"/dashboard/mis_materias" },
      { label: this.subject_name, routerLink:`/dashboard/personas/${this.subject_name}` },
      { label: 'Proponer Proyecto', disabled:true }
    ],
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  loadForm() {
    this.formProject = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      number_of_students: [0, [Validators.required, Validators.min(1)]],
      state: ["on hold", Validators.required],
      group: [this.group_id, Validators.required]
    })
    this.loading = false
  }

  validateFields(field: string) {
    return this.formProject.controls[field].errors &&
      this.formProject.controls[field].touched
  }

  proponentProject(){
    const parsedFormProject = {...this.formProject.value};

    this.projectService.proponentProject(parsedFormProject).subscribe({
      next: value => {
        console.log(value)
        this.alertSuccess(value.data)
      },
      error: e => {
        this.alertError(e.error.data)
      }
    })
  }

}
