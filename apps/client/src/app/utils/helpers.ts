export function getAge(date: string): number {
  const birthdate = new Date(date);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const m = today.getMonth() - birthdate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
}
