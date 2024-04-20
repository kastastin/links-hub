"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { Palette, ImagePlus, Save } from "lucide-react";

import { savePageSettings } from "@/actions/pageActions";
import { RadioTogglers } from "@/components/formItems/RadioTogglers";
import { SubmitButton } from "@/components/buttons/SubmitButton";

export function SettingsForm({ user, pageSettings }) {
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

	return (
		<form action={saveBaseSettings} className="-m-4">
			<div className="flex items-center justify-center rounded-t-md bg-gray-200 py-16">
				<RadioTogglers
					defaultValue={pageSettings.bgType || "color"}
					options={[
						{ label: "Color", value: "color", icon: <Palette /> },
						{ label: "Image", value: "image", icon: <ImagePlus /> },
					]}
				/>
			</div>

			{/* Avatar */}
			<div className="relative -top-8 mx-auto -mb-12 size-32 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-black/20">
				<Image src={user?.image} alt="Avatar" fill />
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
