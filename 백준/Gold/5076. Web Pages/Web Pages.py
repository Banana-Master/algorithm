import sys

for line in sys.stdin:
    line = line.rstrip('\r\n')
    if line == '#':
        break

    stack = []
    is_legal = True
    i = 0
    n = len(line)

    while i < n:
        if line[i] == '<':
            end = line.find('>', i + 1)
            if end == -1:
                is_legal = False
                break

            content = line[i + 1:end].strip()
            i = end + 1

            if not content:
                is_legal = False
                break

            # 닫는 태그: </tag>
            if content.startswith('/'):
                tag_name = content[1:].strip().split()[0] if content[1:].strip() else ''
                if not stack or stack[-1] != tag_name:
                    is_legal = False
                    break
                stack.pop()

            # 자기 완결 태그: <br />
            elif content.endswith('/'):
                continue

            # 여는 태그: <tag attr="...">
            else:
                # 속성이나 슬래시 앞의 태그 이름 추출
                cleaned = content.rstrip('/').strip()
                tag_name = cleaned.split()[0] if cleaned else ''
                if not tag_name:
                    is_legal = False
                    break
                stack.append(tag_name)
        else:
            i += 1

    if stack:
        is_legal = False

    print('legal' if is_legal else 'illegal')