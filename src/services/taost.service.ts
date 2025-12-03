import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const container = document.getElementById('toast-container');

    if (!container) {
      console.warn('Toast container not found');
      return;
    }

    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.innerHTML = `<span>${message}</span>`;
    container.appendChild(div);

    setTimeout(() => div.remove(), 2000);
  }
}
