function solution(phone_number) {
    const visibleLength = 4;
    const length = phone_number.length;
        
    if (length <= visibleLength) {
        return phone_number;
    }

    const maskedPart = '*'.repeat(length - visibleLength);
    const visiblePart = phone_number.slice(-visibleLength);

    return maskedPart + visiblePart;
}