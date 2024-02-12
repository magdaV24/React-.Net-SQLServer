export type Card={
    id: number;
    category: string;
    question: string;
    answer: string;
    wrongAnswerOne: string;
    wrongAnswerTwo: string;
    wrongAnswerThree: string;
    userId: string;
    public: number;
    hasPhotos: number;
    answerPhoto: string;
    wrongAnswerOnePhoto: string;
    wrongAnswerTwoPhoto: string;
    wrongAnswerThreePhoto: string;
}