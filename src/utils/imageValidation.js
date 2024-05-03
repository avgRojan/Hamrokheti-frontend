

const imageValidation = (file) => {const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSizeKB = Number(process.env.NEXT_PUBLIC_DOCUMENT_LIMIT) * 1024 ?? 5120;

  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG and PNG files are allowed';
  }

  if (file.size > maxSizeKB * 1024) {
    return `File size exceeds ${maxSizeKB/1024} MB`;
  }

  return true;
}

export default imageValidation;
