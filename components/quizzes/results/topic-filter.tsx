"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TopicFilterProps = {
  topics: string[];
  selectedTopic: string | null;
  onTopicSelect: (topic: string | null) => void;
};

export function TopicFilter({
  topics,
  selectedTopic,
  onTopicSelect,
}: TopicFilterProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Question Results</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant={selectedTopic === null ? "default" : "outline"}
          onClick={() => onTopicSelect(null)}
          className="mr-2"
        >
          All Topics
        </Button>
        
        {topics.map((topic) => (
          <Button
            key={topic}
            variant={selectedTopic === topic ? "default" : "outline"}
            onClick={() => onTopicSelect(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
}
