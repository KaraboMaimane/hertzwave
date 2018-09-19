import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackUploadPage } from './track-upload';

@NgModule({
  declarations: [
    TrackUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackUploadPage),
  ],
})
export class TrackUploadPageModule {}
