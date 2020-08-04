import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormService } from 'src/app/shared/form.service';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, NgForm, Validators, FormArray } from '@angular/forms';
import { Person } from 'src/app/shared/person.model';
import { AbstractControl } from "@angular/forms";
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormService]
})
export class FormComponent implements OnInit {

  imageSrc: any;
  submitted = false;
  peopleForm: FormGroup;
  countries: [];
  person_list: [];
  selectedPerson: [];
  id = 0;
  name;
  email;
  dob;
  country;
  avatar;
  edit;

  constructor(private fb: FormBuilder, public service: FormService,
    private cd: ChangeDetectorRef) {
    this.service.getJSON().subscribe(data => {
      this.countries = data;
    });
  }

  ngOnInit() {
    this.personList();

    this.peopleForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      dob: new FormControl('', [Validators.required]),
      avatar: new FormControl(''),
      country: new FormControl('')
    });
  }

  get primEmail() {
    return this.peopleForm.get('email')
  }


  // base 64 conversion of image
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }


  // Reset form
  resetForm(peopleForm?: NgForm) {

    this.peopleForm.reset(this.peopleForm);
    this.imageSrc = "";

    this.service.selectedPerson = {
      id: "",
      name: "",
      email: "",
      dob: null,
      country: "",
      avatar: ""
    }
  }

  // get full list
  personList() {
    this.service.personList().subscribe(
      (data: any) => {
        this.person_list = data;
      }
    )
  }


  // On Submit data
  onSubmit(form: NgForm) {
    
    this.submitted = true;

    if (this.edit) {
      this.service.putEmployee(this.peopleForm.value, this.id).subscribe(
        (data: any) => {
          console.log(this.peopleForm.value);
          this.personList();
          this.resetForm(form);
        }
      )

      this.edit = false;

    } else {

      let that = this;
      
      // Base 64 image
      
      // const formData = new FormData();
      // Object.entries(this.peopleForm.value).forEach(
      //   ([key, value]: any[]) => {
      //     if(key !== "avatar"){
      //       formData.set(key, value);
      //     }else{
      //       formData.set(key, image);
      //     } 
      //   });

      this.service.addPerson(this.peopleForm.value).subscribe(
        (data: any) => {
          if (data.id != null || data.id != undefined) {
            this.personList();
            this.resetForm(form);
          }
        }
      )
    }
  }

  // On edit
  onEdit(id, name, email, dob, country, avatar) {

    this.edit = true;

    this.id = id.getAttribute('id');
    this.name = name.getAttribute('name');
    this.email = email.getAttribute('email');
    this.dob = dob.getAttribute('dob');
    this.country = country.getAttribute('country');
    this.avatar = avatar.getAttribute('avatar');

    let list = this.personList();

    this.peopleForm.patchValue({
      id: this.id,
      name: this.name,
      email: this.email,
      dob: this.dob.split('T')[0],
      country: this.country,
      avatar: this.avatar
    });
  }

  get peopleArray() {
    return (<FormArray>this.peopleForm.get('people'));
  }

  d = new Date();

  date(d)
  {
      //get the month
      var month = d.getMonth();
      //get the day
      //convert day to string
      var day = d.getDate().toString();
      //get the year
      var year = d.getFullYear();

      //pull the last two digits of the year
      year = year.toString().substr(-2);

      //increment month by 1 since it is 0 indexed
      //converts month to a string
      month = (month + 1).toString();

      //if month is 1-9 pad right with a 0 for two digits
      if (month.length === 1)
      {
          month = "0" + month;
      }

      //if day is between 1-9 pad right with a 0 for two digits
      if (day.length === 1)
      {
          day = "0" + day;
      }
      return year + '-' + month + '-' + day;
  }

 

  // fetchCountriesData() {
  //   this.service.fetchCountires().subscribe(
  //     (data: any) => {
  //       this.countries = data;
  //     });
  // }

}