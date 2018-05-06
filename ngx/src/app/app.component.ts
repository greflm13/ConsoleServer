import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public console: string[] = [];
  public command: string;
  public path: string;
  private history: string[] = [];

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.get('path').then(res => {
      this.path = res;
    });
  }

  @HostListener('window:keyup', ['$event'])
  async keyup(event: KeyboardEvent) {
    if (event.key === 'Enter' && (this.command !== '' || this.command === undefined || this.command === null)) {
      this.history.push(this.command);
      this.http.post('command', this.command).then(res => {
        // console.log(res);
        this.console.push(res);
      });
      this.command = '';
    }
  }
}
