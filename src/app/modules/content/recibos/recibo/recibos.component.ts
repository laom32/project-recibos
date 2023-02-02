import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecibosService } from 'src/app/services/recibos.service';
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
    }
  ];
  valId: number = 0;
  constructor(
    private _recibo: RecibosService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _msg: SweetAlertMsgService
  ) { }

  ngOnInit(): void {
    this.valId = Number(this._route.snapshot.paramMap.get('id'));
    // if (this.valId > 0) {
    //   this.cargarRecibo(this.valId);
    // }
    this._form = new FormGroup({
      proveedor: new FormControl('', [
        Validators.required,
        // Validators.maxLength(250),
        // Validators.minLength(3),
        // WhiteSpaceValidator
      ]),
      monto: new FormControl(0, [
        Validators.required,

      ]),
      moneda: new FormControl(0, [
        Validators.required,

      ]),
      fecha: new FormControl('', [
        Validators.required,

      ]),
      comentario: new FormControl('', [
        Validators.required,

      ]),
    });
    this.cargarRecibo();
  }
  preGuardar() {
    if (this._form.invalid) {
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
    this._recibo.Save(this._form.value).subscribe({
      next: data => {
        console.log(data);
        if (data) {
          if (data.id > 0)
            this._router.navigate(["/recibos/list"]);
        }
      }, error: data => {
        console.log(data);
      }
    });
  }
  actualizar() {
    this._recibo.Update(this.valId, this._form.value).subscribe({
      next: data => {
        console.log(data);
      }, error: data => {
        console.log(data);
      }
    });
  }
  cargarRecibo() {
    if (this.valId <= 0) {
      return;
    }
    this._recibo.Get(this.valId).subscribe({
      next: data => {
        let vl = data.recibo;
        this._form.controls.proveedor.setValue(vl.proveedor);
        this._form.controls.monto.setValue(vl.monto);
        this._form.controls.moneda.setValue(vl.moneda);
        this._form.controls.fecha.setValue(vl.fecha);
        this._form.controls.comentario.setValue(vl.comentario);
      }, error: data => {
        console.log(data);
      }
    });
  }
}
