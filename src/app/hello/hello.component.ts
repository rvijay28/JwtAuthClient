import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelloService } from '../_services/hello.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  message: string = "Falied to get message from server";
  constructor(private helloService: HelloService, private router: Router) { }

  ngOnInit(): void {
    this.helloService.sayHello().subscribe(data => {
      this.message = data;
    }, error => {
      this.router.navigate([""]);
    });
  }


}
