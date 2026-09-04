import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  return (
    <div className="border border-gray-200 shadow-lg rounded-lg p-6 bg-gradient-to-r from-white to-gray-50 hover:shadow-xl transition-shadow duration-300">
      <h2 className="font-bold text-3xl text-primary mb-4">
        {question?.jobPosition}
      </h2>
      <p className="text-md text-gray-600 mb-3">
        {question?.jobExperience} Years of Experience
      </p>
      <p className="text-xs text-gray-400 mb-5">
        Created At: {new Date(question.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-end mt-6">
        <Button
          onClick={onStart}
          size="lg"
          className="w-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200 rounded-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;