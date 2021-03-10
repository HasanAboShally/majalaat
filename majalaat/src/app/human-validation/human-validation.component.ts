import { EventEmitter } from '@angular/core';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-human-validation',
  templateUrl: './human-validation.component.html',
  styleUrls: ['./human-validation.component.scss']
})
export class HumanValidationComponent implements OnInit, AfterViewInit {

  @Input() generate: Subject<any>;
  @Output() validate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('canvasElement') canvasElement: ElementRef;

  constructor() { }

  public result: string;
  public showError: boolean;
  public showLoading: boolean;
  public showSuccess: boolean;
  private firstNumber: number;
  private secondNumber: number;
  private patternCanvas: any;

  ngOnInit(): void {
    this.result = '';
    this.firstNumber = -1;
    this.secondNumber = -1;
    this.showError = false;
    this.showLoading = false;
    this.showSuccess = false;
    this.createPattern();
    this.generate.subscribe({
      next: () => {
        this.generateNewCode();
      }
    });
  }

  ngAfterViewInit(): void {
    this.generateNewCode();
  }

  validateResult(): void {
    this.showLoading = true;
    const val = parseInt(this.result, 10);
    const flg = val > 1 && val < 31 && (val === (this.firstNumber + this.secondNumber));
    setTimeout(() => {
      this.showLoading = false;
      this.showError = !flg;
      this.showSuccess = flg;
      setTimeout(() => {
        this.validate.emit(flg);
        this.showSuccess = false;
      }, 1000);
    }, 1000);
  }

  private generateNewCode(): void {
    this.result = '';
    this.showError = false;
    this.showLoading = false;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pattern = ctx.createPattern(this.patternCanvas, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '80px Montserrat';
    ctx.fillStyle = '#060d1b';
    ctx.textAlign = 'center';
    this.firstNumber = this.generateRandom();
    this.secondNumber = this.generateRandom();
    ctx.fillText(`${this.firstNumber} + ${this.secondNumber}`, canvas.width / 2, 100);
  }

  private generateRandom(): number {
    return Math.floor((Math.random() * 15) + 1);
  }

  private createPattern(): void {
    this.patternCanvas = document.createElement('canvas');
    const patternContext = this.patternCanvas.getContext('2d');
    const radious = 35;
    this.patternCanvas.width = radious;
    this.patternCanvas.height = radious;
    patternContext.fillStyle = '#fff';
    patternContext.fillRect(0, 0, this.patternCanvas.width, this.patternCanvas.height);
    patternContext.arc(0, 0, radious, 0, .5 * Math.PI);
    patternContext.stroke();
  }

}
