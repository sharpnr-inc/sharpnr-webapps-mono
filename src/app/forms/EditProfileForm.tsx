interface EditProfileFormProps {
  user_firstname: string;
  user_lastname: string;
}

export function EditProfileForm({
  user_firstname,
  user_lastname,
}: EditProfileFormProps) {
  return (
    <div>
      This is the Form for the Edit Profile
      <div>{user_firstname}</div>
      <div>{user_lastname}</div>
    </div>
  );
}
