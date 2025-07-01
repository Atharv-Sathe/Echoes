import {
  Alert,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { LoaderButton } from "./LoaderButton";

export default function DashProfile() {
  const { theme } = useSelector((state) => state.theme);

  const { currentUser, error, loading } = useSelector((state) => state.user);
  // const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserFailure, setUpdateUserFailure] = useState(null);
  const [formData, setFormData] = useState({});
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useDispatch();

  const filePickerRef = useRef();

  const deleteButtonRef = useRef(null);

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // if (file) {
    //   setImageFile(file);
    //   const fileUrl = URL.createObjectURL(file);
    //   setImageFileUrl(fileUrl);
    // }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserFailure(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserFailure("No Changes Made");
      return;
    }

    try {
      dispatch(updateStart());
      const currentUserId = currentUser._id;
      const response = await fetch(`/api/user/update/${currentUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        dispatch(updateFailure(data.message));
        setUpdateUserFailure("❌ Failed to Update Profile : " + data.message);
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile Updated Successfully ✅!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserFailure("❌ Failed to Update Profile : " + error.message);
    } finally {
      // setFormData({});
    }
  };

  // console.log(formData); // Remove in prod
  // useEffect(() => {
  //   if (imageFile) {
  //     uploadImage();
  //   }
  // }, [imageFile]);

  // const uploadImage = async () => {
  //   alert("Profile will not be updated in the DB");
  //   console.error(
  //     "The profile image change feature is currently halted, it will soon resume."
  //   );
  //   console.error("Thank You for your patience.");
  // };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    } finally {
      setShowDeletePopup(false);
    }
  };

  const handleCloseModal = () => {
    setShowDeletePopup(false);

    // Brings back the focus to delete button which opened the modal.
    // Prevents page from scrolling back to top if user hits, no on delete popup.
    setTimeout(() => {
      deleteButtonRef.current?.focus();
    }, 0);
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(signoutFailure(data.message));
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-bold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover  border-zinc-400"
          />
        </div>
        <Label htmlFor="username" value="Username" />
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          className=""
          onChange={handleInputChange}
        />
        <Label htmlFor="email" value="Email" />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        />
        <Label htmlFor="password" value="Password" />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          outline
          disabled={loading}
        >
          {loading ? "Updating.." : "Update"}
        </Button>
        <div className="text-red-500 flex justify-between mt-5">
          <span
            onClick={() => setShowDeletePopup(true)}
            className="cursor-pointer hover:text-zinc-200"
            ref={deleteButtonRef}
            tabIndex="-1"
          >
            Delete Account
          </span>
          <span
            className="cursor-pointer hover:text-zinc-200"
            onClick={handleSignout}
          >
            Sign Out
          </span>
        </div>
      </form>

      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserFailure && (
        <Alert color="failure" className="mt-5">
          {updateUserFailure}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}

      <Modal
        show={showDeletePopup}
        dismissible
        popup
        onClose={handleCloseModal}
        className={theme}
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-200">
              Are you sure you want to delete this account?<br></br> (This
              action is not reversible!)
            </h3>
            <div className="flex justify-center gap-4">
              {!loading && (
                <Button color="red" onClick={() => handleDeleteUser()}>
                  Yes, I&apos;m sure
                </Button>
              )}
              {loading && <LoaderButton text="Deleting" />}
              <Button
                type="button"
                color="alternative"
                className="hover:bg-zinc-200"
                onClick={handleCloseModal}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
