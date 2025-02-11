import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app/app.routes';  // Importa las rutas
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // ✅ Rutas correctamente importadas
      HttpClientModule // ✅ Cliente HTTP importado correctamente
    ),
    provideAnimations() // ✅ Se coloca correctamente fuera de importProvidersFrom()
  ],
})
  .catch(err => console.error(err));
