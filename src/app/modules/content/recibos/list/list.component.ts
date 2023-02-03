import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RecibosService } from 'src/app/services/recibos.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SweetAlertMsgService } from 'src/app/services/sweet-alert-msg.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'proveedor', 'monto', 'moneda', 'fecha', 'comentario', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  total: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageNumber: number = 1;
  pageSize: number = 10;
  constructor(
    private _recibo: RecibosService,
    private _router: Router,
    private _msg: SweetAlertMsgService,
    private _shared: SharedDataService,
    private paginator2: MatPaginatorIntl,
  ) { 
    this.paginator2.itemsPerPageLabel = "Registros por página";
  }

  ngOnInit(): void {
    this.getListado();
    // this.paginator.page.subscribe(data=>{
    //   console.log(data);
    // })
  }

  getListado() {
    this._shared.cargando = true;
    this._recibo.getRecibosList(this.pageNumber, this.pageSize).subscribe({
      next: data => {
        this._shared.cargando = false;
        // console.log(data);
        if (data.isSuccess) {
          this.dataSource = new MatTableDataSource(data.recibos);
          this.total = data.total;
        } else {
          this._msg.alertWarning("Atención", `${data.msg}`);
        }
      }, error: data => {
        this._shared.cargando = false;
        this._msg.alertError("Error", `${data.msg}`);
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
        // console.log(data);
        if (data.isSuccess) {
          this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id !== recibo.id));
        } else {
          this._msg.alertWarning("Atención", `${data.msg}`);
        }
      }, error: data => {
        console.log(data);
        this._msg.alertError("Error", `${data.msg}`);
      }
    });
  }
  pageEvent(ev: any) {
    console.log(ev);
    this.pageNumber = ev.pageIndex + 1;
    this.getListado();
    // this.mostrarVehiculosEstatu(this.estatusSeleccionado);
  }
}
