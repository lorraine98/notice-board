const postOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

async function modifyPost() {
  const password = prompt("Enter password");

  if (!password) {
    return;
  }

  const result = await fetch("/check-password", {
    ...postOption,
    body: JSON.stringify({ id: "{{post._id}}", password }),
  });

  const data = await result.json();

  if (data.isExist) {
    document.location = "/modify/{{post.id}}";
  } else {
    alert("WRONG PASSWORD");
  }
}

async function deletePost() {}
