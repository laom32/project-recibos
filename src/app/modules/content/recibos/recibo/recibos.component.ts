import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecibosService } from 'src/app/services/recibos.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { SweetAlertMsgService } from 'src/app/services/sweet-alert-msg.service';


@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.scss']
})
export class RecibosComponent implements OnInit {
  _form!: FormGroup;
  monedas: any[] = [
    {
      value: 0,
      text: "MXN"
    },
    {
      value: 1,
      text: "USD"
    },
  ];
  valId: number = 0;
  maxDate: Date = new Date();
  constructor(
    private _recibo: RecibosService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _msg: SweetAlertMsgService,
    private _shared: SharedDataService
  ) { }

  ngOnInit(): void {
    this.valId = Number(this._route.snapshot.paramMap.get('id'));

    this._form = new FormGroup({
      proveedor: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]),
      monto: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      moneda: new FormControl(0, [
        Validators.required,
      ]),
      fecha: new FormControl(new Date(), [
        Validators.required,
      ]),
      comentario: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ])
    });
    this.cargarRecibo();
  }
  preGuardar() {
    if (this._form.invalid) {
      this._msg.alertWarning("Atención", "Favor de capturar la información completa.");
      return;
    }
    this._msg.alertWarningConfirm("Atención", "¿Está seguro de guardar?").then(res => {
      if (res.isConfirmed) {
        if (this.valId === 0) {
          this.guardar();
        } else if (this.valId > 0) {
          this.actualizar();
        }
      }
    });

  }
  guardar() {
    this._shared.cargando = true;
    this._recibo.Save(this._form.value).subscribe({
      next: data => {
        // console.log(data);
        this._shared.cargando = false;
        if (data) {
          if (data.id > 0) {
            this._msg.alertSuccess("Éxito", "Los datos se han guardado correctamente.");
            this._router.navigate(["/recibos/list"]);
          } else {
            this._msg.alertWarning("Atención", "Hubo un problema al guardar los datos, favor de contactar con el administrador del sistema.");
          }
        }
      }, error: data => {
        this._shared.cargando = false;
        this._msg.alertError("Error", `${data.msg}`);
        console.log(data);
      }
    });
  }
  actualizar() {
    this._shared.cargando = true;
    this._recibo.Update(this.valId, this._form.value).subscribe({
      next: data => {
        this._shared.cargando = false;
        if (data.isSuccess) {
          this._msg.alertSuccess("Éxito", "Los datos se han guardado correctamente.");
        } else {
          this._msg.alertWarning("Atención", `${data.msg}`);
        }
        // console.log(data);
      }, error: data => {
        this._shared.cargando = false;
        this._msg.alertError("Error", `${data.msg}`);
        console.log(data);
      }
    });
  }
  cargarRecibo() {
    if (this.valId <= 0) {
      return;
    }
    this._shared.cargando = true;
    this._recibo.Get(this.valId).subscribe({
      next: data => {
        this._shared.cargando = false;
        if (data.isSuccess) {
          let vl = data.recibo;
          this._form.controls.proveedor.setValue(vl.proveedor);
          this._form.controls.monto.setValue(vl.monto);
          this._form.controls.moneda.setValue(vl.moneda);
          this._form.controls.fecha.setValue(vl.fecha);
          this._form.controls.comentario.setValue(vl.comentario);
        } else {
          this._msg.alertWarning("Atención", `${data.msg}`);
          this._router.navigate(["/recibos/list"]);
        }
      }, error: data => {
        this._shared.cargando = false;
        this._msg.alertWarning("Atención", `${data.msg}`);
        this._router.navigate(["/recibos/list"]);
        console.log(data);
      }
    });
  }
}
