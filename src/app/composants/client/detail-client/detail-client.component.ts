import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceclientService } from 'src/app/services/serviceclient.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  client: any;

  dtOptions: DataTables.Settings = {};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceclient: ServiceclientService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id']

    this.serviceclient.getDetailClient(id).then(
      (c: any) => {
        this.client = c;
      }
    )
  }


}
