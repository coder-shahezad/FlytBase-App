import { DYNAMIC_DIV_STYLES } from "./../../utils/app-constants";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
})
export class BoxComponent implements OnInit {
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        this.onMoveToTop();
        break;
      case "d":
      case "ArrowRight":
        this.onMoveToRight();
        break;
      case "s":
      case "ArrowDown":
        this.onMoveToDown();
        break;
      case "a":
      case "ArrowLeft":
        this.onMoveToLeft();
        break;
      case "Backspace":
      case "delete":
        this.onDeleteDiv();
        break;
      default:
        alert(
          "Please use W-A-S-D or ↑-←-↓-→ keys to move the selected dev or use Backspace to delete the div."
        );
        break;
    }
  }

  @ViewChild("flytbaseParentBox") flytbaseParentBox: ElementRef;
  index = 1;
  selectedDiv: any;
  parentBoxPosition: any;
  selectedDivPosition: any;
  totalCreatedDiv = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.parentBoxPosition = document
      .getElementById("parentBox")
      .getBoundingClientRect();
    this.totalCreatedDiv = this.getTotalDivCount();
  }

  createFlytbaseChildBox(): void {
    const div = this.renderer.createElement("div");
    const text = this.renderer.createText("Box" + this.index);
    Object.entries(DYNAMIC_DIV_STYLES).forEach((ele) => {
      this.renderer.setStyle(div, ele[0], ele[1]);
      this.renderer.setStyle(div, ele[0], ele[1]);
      this.renderer.setStyle(div, "z-index", this.index);
    });
    this.renderer.appendChild(div, text);
    this.renderer.setAttribute(div, "id", "box-" + this.index);
    this.renderer.appendChild(this.flytbaseParentBox.nativeElement, div);
    this.renderer.listen(div, "click", (event) => {
      const childNodes = document.getElementById("parentBox").childNodes;
      childNodes.forEach((ele) => {
        ele.removeEventListener;
        this.renderer.setStyle(ele, "background", "#6200ea");
      });
      this.renderer.setStyle(event.target, "background", "#4caf50");
      this.selectedDiv = event.target;
    });
    this.index++;
    this.totalCreatedDiv = this.getTotalDivCount();
  }

  onMoveToTop(): void {
    let position = this.selectedDiv.getBoundingClientRect();
    let top = position.top;
    if (top <= this.parentBoxPosition.top) {
      alert("You have already reached to top position");
      return;
    }
    top -= 5;
    this.renderer.setStyle(this.selectedDiv, "top", top + "px");
  }
  onMoveToRight(): void {
    let position = this.selectedDiv.getBoundingClientRect();
    let left = position.left;
    if (position.right >= this.parentBoxPosition.right) {
      alert("You have already reached to right position");
      return;
    }
    left += 5;
    this.renderer.setStyle(this.selectedDiv, "left", left + "px");
  }
  onMoveToDown(): void {
    let position = this.selectedDiv.getBoundingClientRect();
    let top = position.top;
    if (position.bottom >= this.parentBoxPosition.bottom) {
      alert("You have already reached to bottom position");
      return;
    }
    top += 5;
    this.renderer.setStyle(this.selectedDiv, "top", top + "px");
  }
  onMoveToLeft(): void {
    let position = this.selectedDiv.getBoundingClientRect();
    let left = position.left;
    if (left <= this.parentBoxPosition.left) {
      alert("You have already reached to left position");
      return;
    }
    left -= 5;
    this.renderer.setStyle(this.selectedDiv, "left", left + "px");
  }

  onDeleteDiv(): void {
    this.renderer.removeChild(
      this.flytbaseParentBox.nativeElement,
      this.selectedDiv
    );
    this.totalCreatedDiv = this.getTotalDivCount();
    if (this.totalCreatedDiv == 0) {
      this.index = 1;
    }
  }

  getTotalDivCount(): number {
    return document.getElementById("parentBox").childNodes.length;
  }
}
