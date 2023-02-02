import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RecibosService } from 'src/app/services/recibos.service';
import { SweetAlertMsgService } from 'src/app/services/sweet-alert-msg.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'proveedor', 'monto', 'moneda', 'fecha', 'comentario', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private _recibo: RecibosService,
    private _router: Router,
    private _msg: SweetAlertMsgService
  ) { }

  ngOnInit(): void {
    this.getListado();
  }

  getListado() {
    this._recibo.getRecibosList().subscribe({
      next: data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data.recibos);
      }
    });
  }
  goTo(recibo: any) {
    this._router.navigate(["/recibos/recibo", recibo.id]);
  }
  preBorrar(recibo: any) {
    this._msg.alertWarningConfirm("Atención", "¿Está seguro de eliminar el recibo seleccionado?").then(res => {
      if (res.isConfirmed) {
        this.borrar(recibo);
      }
    });
  }
  borrar(recibo: any) {
    this._recibo.Remove(recibo.id).subscribe({
      next: data => {
        console.log(data);
        if (data.isSuccess) {
          this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id !== recibo.id));
        }
      }, error: data => {
        console.log(data);
      }
    });
  }
}
