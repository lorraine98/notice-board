const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

async function modifyPost(id) {
  const password = prompt("Enter password");

  if (!password) {
    return;
  }

  const result = await fetch("/check-password", {
    ...postOption,
    body: JSON.stringify({ id, password }),
  });

  const data = await result.json();

  if (data.isExist) {
    document.location = `/modify/${id}`;
  } else {
    alert("WRONG PASSWORD");
  }
}

async function deletePost() {}
