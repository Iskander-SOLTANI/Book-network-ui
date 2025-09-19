import { Component, OnInit } from '@angular/core';
import { BookRoutingModule } from "../../book-routing.module";

@Component({
  selector: 'app-menu',
  imports: [BookRoutingModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
ngOnInit(): void {
  const linkColor = document.querySelectorAll('.nav-link');
  linkColor.forEach(link => {
    if(window.location.href.endsWith(link.getAttribute('href')|| '')){
        link.classList.add('active');
    }
    link.addEventListener('click', () => {
      linkColor.forEach(l => l .classList.remove('active'));
      link.classList.add('active');
    });
    });
}
logout() {   
   sessionStorage.clear();   
   window.location.reload();                                                                                                                            
}

}
