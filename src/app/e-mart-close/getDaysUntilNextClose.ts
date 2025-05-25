"use client";

export function getDaysUntilNextClose(eMartClose: Date[]) {
  const today = new Date();
  const nextCloseDate = eMartClose.filter((date) => date > today).sort((a, b) => a.getTime() - b.getTime())[0];
  return nextCloseDate ? Math.ceil((nextCloseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null;
}
