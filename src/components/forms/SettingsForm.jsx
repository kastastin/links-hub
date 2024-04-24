"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Palette, ImagePlus, Save, SquarePen } from "lucide-react";

import { savePageSettings } from "@/actions/pageActions";
import { RadioTogglers } from "@/components/formItems/RadioTogglers";
import { SubmitButton } from "@/components/buttons/SubmitButton";

export function SettingsForm({ user, pageSettings }) {
	const [bgType, setBgType] = useState(pageSettings.bgType);
	const [bgColor, setBgColor] = useState(pageSettings.bgColor);
	const [bgImage, setBgImage] = useState(pageSettings.bgImage);
	const [avatar, setAvatar] = useState(user?.image);

	async function saveBaseSettings(formData) {
		const toastId = toast.loading("Saving settings...");

		try {
			const result = await savePageSettings(formData);

			if (result) {
				toast.success("Settings saved successfully!", { id: toastId });
			} else {
				throw new Error("Failed to save settings");
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		}
	}

	async function upload(e, callbackFn) {
		const file = e.target.files?.[0];

		const uploadPromise = new Promise((resolve, reject) => {
			const formData = new FormData();
			formData.set("file", file);

			fetch("/api/upload", {
				method: "POST",
				body: formData,
			}).then((response) => {
				if (!response.ok) reject();

				response.json().then((link) => {
					callbackFn(link);
					resolve(link);
				});
			});
		});

		await toast.promise(uploadPromise, {
			loading: "Uploading image...",
			success: "Image uploaded successfully!",
			error: "Failed to upload image",
		});
	}

	async function handleCoverImageChange(e) {
		await upload(e, (link) => setBgImage(link));
	}

	async function handleAvatarImageChange(e) {
		await upload(e, (link) => setAvatar(link));
	}

	return (
		<form action={saveBaseSettings} className="-m-4">
			<div
				className="flex min-h-[250px] items-center justify-center rounded-t-md bg-cover bg-center py-4"
				style={
					bgType === "color" || !bgImage
						? { backgroundColor: bgColor }
						: { backgroundImage: `url(${bgImage})` }
				}
			>
				<div>
					<RadioTogglers
						defaultValue={pageSettings.bgType}
						options={[
							{ label: "Color", value: "color", icon: <Palette /> },
							{ label: "Image", value: "image", icon: <ImagePlus /> },
						]}
						onChange={(value) => setBgType(value)}
					/>

					<div className="mt-3 rounded-md border border-gray-300 bg-blue-50 py-1 shadow-inner">
						{bgType === "color" ? (
							<div className="flex h-[25px] items-center justify-center gap-x-2">
								<span className="font-medium">Background color:</span>
								<input
									type="color"
									name="bgColor"
									defaultValue={pageSettings.bgColor}
									onChange={(e) => setBgColor(e.target.value)}
								/>
							</div>
						) : (
							<div className="flex h-[25px] items-center justify-center">
								<label className="w-full cursor-pointer text-center font-medium">
									Choose image
									<input type="hidden" name="bgImage" value={bgImage} />
									<input
										type="file"
										className="hidden"
										onChange={handleCoverImageChange}
									/>
								</label>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Avatar */}
			<div className="relative">
				<div className="relative -top-10 mx-auto -mb-12 size-32 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-black/20">
					<Image
						src={avatar}
						alt="Avatar"
						fill
						objectFit="cover"
						className="aspect-square"
					/>
				</div>

				<div className="relative -top-[120px] mx-auto -mb-12 size-32">
					{/* Change icon */}
					<label
						htmlFor="avatarInput"
						className="absolute bottom-0 right-0 cursor-pointer rounded-full border border-gray-200 bg-white p-2 shadow-inner"
					>
						<SquarePen className="size-5 text-gray-600" />
					</label>
					<input
						id="avatarInput"
						type="file"
						className="hidden"
						onChange={handleAvatarImageChange}
					/>
					<input type="hidden" name="avatar" value={avatar} />
				</div>
			</div>

			<div className="settings-form mx-auto max-w-96 space-y-4 p-4 pb-1">
				{/* Display name */}
				<div>
					<label htmlFor="nameInput">Display name</label>
					<input
						id="nameInput"
						type="text"
						name="displayName"
						defaultValue={pageSettings?.displayName}
						placeholder="Walter White"
					/>
				</div>

				{/* Location */}
				<div>
					<label htmlFor="locationInput">Location</label>
					<input
						id="locationInput"
						type="text"
						name="location"
						defaultValue={pageSettings?.location}
						placeholder="Albuquerque, New Mexico"
					/>
				</div>

				{/* Bio */}
				<div>
					<label htmlFor="bioInput">Bio</label>
					<textarea
						id="bioInput"
						name="bio"
						defaultValue={pageSettings?.bio}
						rows="2"
						placeholder="Write something about yourself..."
					/>
				</div>
			</div>

			{/* Submit button */}
			<div className="mx-auto mb-3 max-w-[150px] text-white">
				<SubmitButton>
					Save
					<Save size={23} />
				</SubmitButton>
			</div>
		</form>
	);
}
