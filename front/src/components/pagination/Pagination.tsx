import {useMemo} from "react";
import {cn} from "../../helpers/cn.ts";


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

const avarageVal = (a: number, b: number) => {
    return Math.floor((a+b)/2);
}

const Pagination = ({
                        currentPage,
                        totalPages,
                        onPageChange,
                        siblingCount = 1
                    }: PaginationProps) => {

    const paginationRange = useMemo(()=> {
        const totalPageNumbers = siblingCount * 2 + 5;
        if(totalPageNumbers >= totalPages){
            return Array.from({length: totalPages}, (_, i) => i+1);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        const shouldLeftDots = leftSiblingIndex > 2;
        const shouldRightDots = rightSiblingIndex < totalPages - 1;

        console.log(shouldLeftDots, shouldRightDots)

        if(!shouldLeftDots && shouldRightDots) {
            const leftRange = Array.from(
                {length: 3 + 2 * siblingCount},
                (_, i) => i+1,
            )
            return [...leftRange, {isMiddleBtn: true, page: avarageVal(leftRange.length - 1, lastPageIndex)}, lastPageIndex];
        }

        if(shouldLeftDots && !shouldRightDots){
            const rightRange = Array.from(
                {length: 3 + 2 * siblingCount},
                (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i,
            )

            return [firstPageIndex, {isMiddleBtn: true, page: avarageVal(firstPageIndex, rightRange[0])}, ...rightRange]
        }

        if(shouldLeftDots && shouldRightDots){
            const middleRange = Array.from(
                {length: rightSiblingIndex - leftSiblingIndex + 1},
                (_, i) => leftSiblingIndex + i
            )
            return [
                firstPageIndex,
                {isMiddleBtn: true, page: avarageVal(firstPageIndex, middleRange[0])},
                ...middleRange,
                {isMiddleBtn: true, page: avarageVal(middleRange[middleRange.length - 1], lastPageIndex)},
                lastPageIndex
            ];
        }

        return []
    }, [currentPage, totalPages, siblingCount])



    // if(totalPages > 1) return null; //?????????

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                ←
            </button>

            {paginationRange.map((page, i) =>
                typeof page !== 'number' && page?.isMiddleBtn ? (
                    <button key={i}
                            onClick={() => onPageChange(page?.page as number)}
                            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                        ...
                    </button>
                ) : (
                    <button
                        key={i}
                        onClick={() => onPageChange(page as number)}
                        className={cn(
                            "px-3 py-1 rounded",
                            page === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                        )}
                    >
                        {page as number}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;