import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Añadir ReactiveFormsModule aquí
import { IonicModule } from '@ionic/angular';
import { UpdateUserPageRoutingModule } from './update-user-routing.module';
import { UpdateUserPage } from './update-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Importar ReactiveFormsModule para usar formularios reactivos
    IonicModule,
    UpdateUserPageRoutingModule  // Asegúrate de que el módulo de rutas esté importado
  ],
  declarations: [UpdateUserPage]
})
export class UpdateUserPageModule {}
