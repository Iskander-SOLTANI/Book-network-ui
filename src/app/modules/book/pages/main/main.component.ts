import { Component } from '@angular/core';
import { BookRoutingModule } from "../../book-routing.module";
import { MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-main',
  imports: [BookRoutingModule, MenuComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
