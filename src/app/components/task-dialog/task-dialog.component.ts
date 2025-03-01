import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, 
    MatCheckboxModule, MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './task-dialog.component.html',
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', [Validators.required, Validators.maxLength(255)]],
      description: [this.task?.description || ''],
      completed: [this.task?.completed || false]
    });

    // Forzar validación inicial
    this.taskForm.updateValueAndValidity();
  }

  save() {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;
    if (this.task.id) {
      this.taskService.updateTask(this.task.id, taskData).subscribe({
        next: () => this.dialogRef.close(taskData),
        error: (err) => this.handleApiError(err)
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: (newTask) => this.dialogRef.close(newTask),
        error: (err) => this.handleApiError(err)
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  private handleApiError(error: any) {
    if (error.error && error.error.errors) {
      this.errorMessage = error.error.errors.title?.[0] || 'An unexpected error occurred';
    } else {
      this.errorMessage = 'An unexpected error occurred';
    }
  }
}
