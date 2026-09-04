import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300">
      <h2 className="font-bold text-xl text-primary mb-2">
        {question?.jobPosition}
      </h2>
      <p className="text-md text-gray-600 mb-3">
        {question?.jobExperience} Years of Experience
      </p>
      <p className="text-sm text-gray-500 mb-5">
        Created At: {new Date(question.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-end mt-4">
        <Button onClick={onStart} size="md" className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;